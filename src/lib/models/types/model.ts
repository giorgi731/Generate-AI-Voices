import ModelVoiceType from './model-voice-type';

interface Model {
  id: number;
  name: string;
  voice_type: ModelVoiceType;
  vocal_range?: string;
  created_by: string | undefined;
  enabled: boolean;
  created_at: string;
  description: string;
  traits: string[];
  genre: string;
  gender: string;
  age: string;
  public: boolean;
  parent_model_id?: number;
}

export default Model;
