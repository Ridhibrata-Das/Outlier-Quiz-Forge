import React from 'react'
import Layout from 'src/components/Layout/Layout'
import Breadcrumb from 'src/components/Common/Breadcrumb'

const PrivacyPolicy = () => (
  <Layout>
    <Breadcrumb title="Privacy Policy" content="" contentTwo="" />
    <div className='Instruction'>
      <div className='container'>
        <div className='row morphisam'>
          <div className='col-12'>
            <h2>Privacy Policy</h2>
            <p><strong>Developer:</strong> Ridhibrata Das</p>
            <p><strong>Email:</strong> <a href="mailto:ridhibratadas@gmail.com">ridhibratadas@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919733557339">+91 9733557339</a></p>
            <p><strong>Institution:</strong> Techno Main Salt Lake</p>
            <p>This software is a vibe coded project for the Outlier Vibe Coding Competition. The topic is <strong>EDUCATION</strong> - Quiz app with score at end and retry option.</p>
            <p><strong>Privacy Commitment:</strong> We value your privacy. This app does not collect or share personal data beyond what is necessary for quiz functionality. No user data is sold or used for advertising. All quiz results and scores are stored securely and are only visible to the user.</p>
            <p>For any privacy-related concerns, please contact the developer at the email or phone number above.</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default PrivacyPolicy;
