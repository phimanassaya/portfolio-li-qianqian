import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Lock, Upload } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { isSupabaseConfigured } from '../lib/supabase';
import { uploadProfileImage, uploadResume } from '../services/storage.service';

const SESSION_KEY = 'portfolio_admin_unlocked';

const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const RESUME_MAX_BYTES = 10 * 1024 * 1024;
const RESUME_TYPE = 'application/pdf';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface AssetUploadCardProps {
  title: string;
  description: string;
  accept: string;
  maxBytes: number;
  allowedTypes: string[];
  showImagePreview: boolean;
  onUpload: (file: File) => Promise<string>;
}

function AssetUploadCard({
  title,
  description,
  accept,
  maxBytes,
  allowedTypes,
  showImagePreview,
  onUpload
}: AssetUploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showImagePreview || !file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, showImagePreview]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setStatus('idle');
    setMessage('');

    if (!selected) {
      setFile(null);
      return;
    }
    if (!allowedTypes.includes(selected.type)) {
      setFile(null);
      setStatus('error');
      setMessage(`Unsupported file type${selected.type ? `: ${selected.type}` : ''}.`);
      return;
    }
    if (selected.size > maxBytes) {
      setFile(null);
      setStatus('error');
      setMessage(`File is too large. Max size is ${Math.round(maxBytes / (1024 * 1024))} MB.`);
      return;
    }
    setFile(selected);
  }

  async function handleSave() {
    if (!file) return;
    setStatus('uploading');
    setMessage('');
    try {
      await onUpload(file);
      setStatus('success');
      setMessage('Uploaded successfully. The live site now serves this file.');
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    }
  }

  return (
    <Card className="space-y-5">
      <div>
        <h3 className="font-heading text-lg font-bold text-heading">{title}</h3>
        <p className="mt-1 text-sm text-body">{description}</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="block w-full text-sm text-body file:mr-4 file:rounded-btn file:border-0 file:bg-gradient-to-r file:from-primary-600 file:via-primary file:to-primary-300 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-background"
      />

      {showImagePreview && previewUrl ? (
        <img
          src={previewUrl}
          alt="Selected file preview"
          className="h-40 w-40 rounded-2xl border border-border object-cover object-top"
        />
      ) : null}
      {!showImagePreview && file ? (
        <p className="text-sm text-body">
          {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
        </p>
      ) : null}

      <Button onClick={handleSave} disabled={!file || status === 'uploading'} className="w-full">
        {status === 'uploading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" aria-hidden="true" />
            Save
          </>
        )}
      </Button>

      {status === 'success' ? (
        <p className="flex items-center gap-2 text-sm text-success" role="status">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          {message}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="flex items-center gap-2 text-sm text-error" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {message}
        </p>
      ) : null}
    </Card>
  );
}

function Admin() {
  useDocumentTitle('Admin | Portfolio');

  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  function handleUnlock(event: FormEvent) {
    event.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

    if (!adminPassword) {
      setAuthError('VITE_ADMIN_PASSWORD is not configured for this site.');
      return;
    }
    if (password === adminPassword) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  }

  if (!unlocked) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center py-20 text-center">
        <Lock className="h-8 w-8 text-primary" aria-hidden="true" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-heading">Admin Access</h1>
        <p className="mt-2 text-sm text-body">Enter the admin password to manage portfolio assets.</p>
        <form onSubmit={handleUnlock} className="mt-8 w-full space-y-4">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            aria-label="Admin password"
            autoFocus
            className="w-full rounded-btn border border-border bg-surface px-4 py-3 text-sm text-heading outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          />
          {authError ? (
            <p className="flex items-center gap-2 text-sm text-error" role="alert">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {authError}
            </p>
          ) : null}
          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <SectionTitle title="Portfolio Assets" description="Replace the live profile image and resume PDF." />

      {!isSupabaseConfigured ? (
        <Card className="border-error">
          <p className="flex items-center gap-2 text-sm text-error" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable uploads.
          </p>
        </Card>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <AssetUploadCard
          title="Profile Image"
          description="JPG, PNG or WEBP. Max 5 MB."
          accept="image/jpeg,image/png,image/webp"
          maxBytes={PROFILE_IMAGE_MAX_BYTES}
          allowedTypes={PROFILE_IMAGE_TYPES}
          showImagePreview
          onUpload={uploadProfileImage}
        />
        <AssetUploadCard
          title="Resume PDF"
          description="PDF only. Max 10 MB."
          accept="application/pdf"
          maxBytes={RESUME_MAX_BYTES}
          allowedTypes={[RESUME_TYPE]}
          showImagePreview={false}
          onUpload={uploadResume}
        />
      </div>
    </div>
  );
}

export default Admin;
