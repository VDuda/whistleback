import { Suspense } from 'react';
import UploadPageClient from './upload-page-client';

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <UploadPageClient />
    </Suspense>
  );
}