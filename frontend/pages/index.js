import React, { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'

function IndexPage() {

    return (
      <div>
        <div>
            Login page
        </div>
        <div>
            <Link href="/join">
                <button>회원가입</button>
            </Link>
        </div>
      </div>
    )
  }
  
  export default IndexPage