import OptionType from './option-type';

interface AudioConversion {
  cost: number | undefined;
  model_id: number | undefined;
  input_url: string | undefined;
  options: OptionType;
  date: string;
  user_id: string | undefined;
  duration: string;
  result: string[] | undefined;
  name: string;
}

export default AudioConversion;
