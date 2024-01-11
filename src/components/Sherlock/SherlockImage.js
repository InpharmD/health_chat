import React, { memo } from 'react'
import Image from 'next/image'
const SherlockImage =memo(() => {
  return (
    <div className="flex flex-col items-center justify-center 2xl:h-[50%]">
    <Image
      src={"/assets/inpharmd sherlock.png"}
      alt="Loader"
      width={50}
      height={50}
      className="relative mt-5 h-8 mb-5"
    />
    <p className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent text-xl">
      How can I help you today?
    </p>
  </div>
  )
})
SherlockImage.displayName = 'SherlockImage';
export default SherlockImage