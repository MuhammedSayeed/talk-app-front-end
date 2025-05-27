"use client"
import { Input } from '../input'
import { Button } from '../button'
import { ImagePlus, SendHorizontal } from 'lucide-react'
import useMessageInput from '@/hooks/useMessageInput'




const MessageInput = () => {
  const { handleInputChange, handleFileChange, fileInputRef, handleButtonClick, handleSendMessage, message } = useMessageInput();


  return (
    <div className='md:rounded-bl-lg md:rounded-br-lg p-4 border-t flex items-center justify-between gap-2'>
      <Input onChange={handleFileChange} ref={fileInputRef} type='file' accept='image/*' className='hidden' />
      <Button onClick={handleButtonClick} className='cursor-pointer' variant={"outline"}>
        <ImagePlus className='size-5' />
      </Button>
      <form onSubmit={(e) => handleSendMessage(e)} className='flex flex-1 gap-2 h-full justify-between items-center '>
        <div className="flex-1 remove-outline ">
          <Input value={message} onChange={handleInputChange} placeholder="Send a message" className='!bg-transparent' />
        </div>
        <Button disabled={message.length === 0} type="submit" variant={"outline"} className='cursor-pointer'>
          <SendHorizontal className='size-5' />
        </Button>
      </form>
    </div>
  )
}

export default MessageInput