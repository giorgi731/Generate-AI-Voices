import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const formData = await request.formData();
    const jsonData = Object.fromEntries(formData);
    console.log(jsonData, "awaokwoakowkoakok")
    try {
        const response = await axios.post('https://api.revocalize.ai/revocalize', jsonData, {
            headers: {
                'Authorization': request.headers.get('Authorization'),
                'Content-Type': 'application/json'
            },
        });
        console.log(response.data)
        return NextResponse.json(response.data)
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error })
    }
}
