import React, { memo } from 'react'
import Link from 'next/link'
const SherlockButton = memo(() => {
  return (
    <div className="mb-[1.5rem] ml-2 text-white">
          <ul className="flex gap-2">
            <li>
              <Link href="/sherlock">
                <button className="bg-gradient-to-r from-[#9c4ae9] to-[#ff8520] rounded-lg px-6 py-1">
                  Sherlock
                </button>
              </Link>
            </li>
          </ul>
        </div>
  )
})

export default SherlockButton