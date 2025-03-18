'use client'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'

type Props = {
  apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split('.').pop()
  const [loading, setLoading] = useState(false)

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      (e.target.files[0]?.type.includes("image") ||
        e.target.files[0]?.type.includes("img")) &&
      e.target.files[0].size < 5242880
    ) {
      await submit(e.target.files[0])
    } else {
      toast.error("Invalid file type")
    }
  }

  const submit = async (file: File) => {
    try {
      console.log("filetpe",file.type)
      setLoading(true)
      const resp = await fetch(`/api/signedUrl`, {
        method: 'POST',
        body: JSON.stringify({
          fileType: file.type,
          apiEndpoint: apiEndpoint
        })
      })
      console.log(resp)
      const url = await resp.text();

      if (!url) {
        setLoading(false)
        return toast.error('Error uploading image')
      }

      await axios.put(url, file.slice(), {
        headers: { 'Content-Type': file.type }
      })
      const image = new URL(url)
      const imageUrl = image.origin + image.pathname + "?v=" + Date.now()
      onChange(imageUrl)
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Error uploading image')
      setLoading(false)
    }
  }

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image src={value} alt="uploaded image" className="object-contain" fill />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={() => onChange('')} variant="ghost" type="button">
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full bg-muted/30 flex flex-col items-center space-y-4 p-4 rounded-lg">
      <input id="file-upload-image" name="image" type="file" className="hidden" onChange={onFileChange} />
      <Button asChild>
        <label htmlFor="file-upload-image" className="cursor-pointer">
          {loading ? "Uploading..." : "Upload Image"}
        </label>
      </Button>
    </div>
  )
}

export default FileUpload
