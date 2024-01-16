'use client'
import Image from 'next/image'
import addIcon from './assets/icon-add-task-mobile.svg'
export default function Home() {
  return (
    <section className="flex-grow grid place-items-center">
      <div className="text-center px-6 flex flex-col items-center gap-6">
        <p className="text-headingL font-bold text-medium-grey text-center">This board is empty. Create a new column to get started.</p>
      <button className="buttonM button-primary flex items-center gap-2"><Image src={addIcon} alt='add icon' aria-hidden="true" /> Add New Column</button> 
      </div>
      
    </section>
  )
}
