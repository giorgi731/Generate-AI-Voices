import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 60;

export async function POST(request: Request) {
    const formData = await request.formData();
    try {
        const response = await axios.post('https://api.revocalize.ai/convert', formData, {
            headers: {
                'Authorization': request.headers.get('Authorization')
            },
        });
        console.log(response.data)
        if (response.status !== 200 || response.data.error)
            return NextResponse.json({ error: 'Request failed with status code: ' + response.status });
        else
            return NextResponse.json(response.data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error })
    }
}
