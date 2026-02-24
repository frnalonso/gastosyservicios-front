import React from 'react'

const PageContainer = ({children}) => {
  return (
    <main className='w-full max-w-none md:max-w-4xl mx-auto p-6'>
        {children}
    </main>
  )
}

export default PageContainer
