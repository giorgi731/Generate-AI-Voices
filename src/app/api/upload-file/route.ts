import { NextResponse } from 'next/server';
import S3 from 'aws-sdk/clients/s3'
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {

  const client = getSupabaseServerClient();

  try {
    // require the user to be logged in
    const sessionResult = await requireSession(client);
    if ('redirect' in sessionResult) 
        return redirect(sessionResult.destination);
    const userId = sessionResult.user.id;
    // console.log("User ID: "+userId)

    const { searchParams } = new URL(request.url)
    // console.log(searchParams)
    const file = searchParams.get('file')
    const fileType = searchParams.get('fileType')
    const isTrainingAudio = searchParams.get('training')
    const isImage = searchParams.get('image')
    // console.log(file)
    // console.log(fileType)
    if(isTrainingAudio) console.log('File is training audio: ', isTrainingAudio);
    
    const s3 = new S3({ apiVersion: '2006-03-01' })
    const date = new Date().toISOString().replace('T', '_').replace(/\..+/, '');
    let sanitizedFileName = file as string;
    sanitizedFileName = sanitizedFileName.replace(/%20/g, '%252520');

    // Update key to include userId, date, and sanitized file name
    let keyPath = `web_uploads/${userId}/${date}_${sanitizedFileName}` as string;
    if (isTrainingAudio) keyPath = `web_uploads/${userId}/training/${date}_${sanitizedFileName}` as string;
    if (isImage) keyPath = `web_uploads/${userId}/images/${date}_${sanitizedFileName}` as string;
    const post = s3.createPresignedPost({
        Bucket: process.env.BUCKET_NAME,
        Fields: {
            key: keyPath,
            'Content-Type': fileType as string,
            'acl': 'public-read', // Make the file publicly readable
        },
        Expires: 300,
        Conditions: [
            ['content-length-range', 0, 314572800], // up to 300 MB
            ['eq', '$acl', 'public-read'], // Ensure the acl is set to public-read
        ],
    })
    // Construct the final S3 URL
    const s3_url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${keyPath}`;
    (post as any)['s3_url'] = s3_url;
    console.log(post)
    
    return NextResponse.json(post)
  } catch (e) {
    console.log(e)
    return throwInternalServerErrorException();
  }
}

