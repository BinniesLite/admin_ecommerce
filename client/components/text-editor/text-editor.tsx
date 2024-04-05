'use client'

import { useEditor, EditorContent } from '@tiptap/react'

import { configs } from './configs'
import { Toolbar } from './toolbar';


export type EditorType = ReturnType<typeof useEditor>;

export const TextEditor = () => {
  const editor = useEditor(configs)


  return (

    <>
      <div className='border-[1.5px] '>
        <div className=''>
          <Toolbar editor={editor}/>
          <EditorContent rowSpan={10} rows={10} className='outline-none focus:none  p-2 border-2 border-gray-300 rounded-md' editor={editor} />
         
        </div>
      </div>
    </>
  )
}
