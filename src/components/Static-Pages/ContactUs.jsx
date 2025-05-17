"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { settingsData } from 'src/store/reducers/settingsSlice'
import purify from 'dompurify'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })

const ContactUs = ({ t }) => {
    const selectdata = useSelector(settingsData)

    const appdata = selectdata && selectdata.filter(item => item.type === 'contact_us')

    const data = appdata && appdata[0]?.message

    return (
        <Layout>
            <Breadcrumb title={t('contact_us')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <h2>Contact Us</h2>
                            <p><strong>Developer:</strong> Ridhibrata Das</p>
                            <p><strong>Email:</strong> <a href="mailto:ridhibratadas@gmail.com">ridhibratadas@gmail.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:+919733557339">+91 9733557339</a></p>
                            <p><strong>Institution:</strong> Techno Main Salt Lake</p>
                            <p>This project is a vibe coded entry for the Outlier Vibe Coding Competition. Topic: <strong>EDUCATION</strong> - Quiz app with score at end and retry option. For any queries, suggestions, or collaboration opportunities, feel free to reach out!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default withTranslation()(ContactUs)
