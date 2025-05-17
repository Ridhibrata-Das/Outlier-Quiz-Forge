"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import purify from 'dompurify'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import { settingsData } from 'src/store/reducers/settingsSlice'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })

const AboutUs = ({ t }) => {
    const selectdata = useSelector(settingsData)

    const appdata = selectdata && selectdata.filter(item => item.type === 'about_us')

    const data = appdata && appdata[0]?.message

    return (
        <Layout>
            <Breadcrumb title={t('about_us')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <h2>About Us</h2>
                            <p><strong>Developer:</strong> Ridhibrata Das</p>
                            <p><strong>Email:</strong> ridhibratadas@gmail.com</p>
                            <p><strong>Phone:</strong> +91 9733557339</p>
                            <p><strong>Institution:</strong> Techno Main Salt Lake</p>
                            <p>This software is a vibe coded project for the Outlier Vibe Coding Competition. The topic is <strong>EDUCATION</strong> - a Quiz app with a score at the end and a retry option. The platform is designed to make learning fun and interactive, allowing users to test their knowledge, view their scores, and try again to improve. Many more features and improvements are planned to enhance the educational experience. Thank you for visiting!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withTranslation()(AboutUs)
