import React, { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'

function MainPage() {
    return (
        <Layout>
            <div className="test">
                MainPage is a React component
            </div>
        </Layout>
    )
}

export default MainPage