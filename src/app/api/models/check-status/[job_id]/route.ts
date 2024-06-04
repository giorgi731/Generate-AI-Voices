import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, context: { params:any }) {
    const job_id = context.params.job_id;
    try {
        const response = await axios.get(`https://api.revocalize.ai/models/train/${job_id}`, {
            headers: {
                'Authorization': request.headers.get('Authorization'),
                'Content-Type': 'application/json'
            },
        });
        // console.log(response.data)
        return NextResponse.json(response.data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error })
    }
}
