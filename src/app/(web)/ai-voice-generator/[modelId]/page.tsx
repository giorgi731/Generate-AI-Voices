import React from 'react';
import { ConvertPage } from '../ConvertPage';

function page(props: any) {
  return <ConvertPage modelId={props.params.modelId} />;
}

export default page;
