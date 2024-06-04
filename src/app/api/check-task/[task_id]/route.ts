import { NextResponse } from 'next/server';
import axios from 'axios';

// GET /api/check-task/:task_id
export async function GET(request: Request, context: { params: any }) {
  console.log(context.params);
  const taskId = context.params.task_id;
  try {
    const response = await axios.get(`https://api.revocalize.ai/check-task/${taskId}`, {
      headers: { Authorization: request.headers.get('Authorization') }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
