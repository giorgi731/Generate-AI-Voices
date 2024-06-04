'use client';
import useApiKey from '~/core/hooks/use-api-key';

const OrganizationSettingsPage = () => {
  const apiKey = useApiKey();
  
  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
    }
  }
  return (
    <div>
      <h2 className="font-[700] text-white">API Key:</h2>
      <p className="font-[400] text-gray-500 max-w-[768px] break-all">{apiKey}</p>
      <button onClick={handleCopyApiKey}>Copy</button>
    </div>
  );
};

export default OrganizationSettingsPage;
