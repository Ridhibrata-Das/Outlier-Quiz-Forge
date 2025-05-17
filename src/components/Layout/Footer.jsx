"use client"
import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { sysConfigdata } from "src/store/reducers/settingsSlice";
import { websettingsData } from "src/store/reducers/webSettings";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { t } from "i18next";
import appstoreimg from "src/assets/images/appstore.svg"
import palystoreimg from "src/assets/images/playstore.svg"
const Footer = () => {

    const systemconfig = useSelector(sysConfigdata)

    const appLink = systemconfig?.app_link

    const appiosLink = systemconfig?.ios_app_link

    const websettingsdata = useSelector(websettingsData);

    const SocialMedia = websettingsdata && websettingsdata.social_media;

    // footer logo
    const footer_logo = '/logo.svg';

    // company text
    const company_text = websettingsdata && websettingsdata.company_text;

    // address
    const address_text = websettingsdata && websettingsdata.address_text;

    // email
    const email_footer = websettingsdata && websettingsdata.email_footer;

    // phone number
    const phone_number_footer = websettingsdata && websettingsdata.phone_number_footer;

    // web link
    const web_link_footer = websettingsdata && websettingsdata.web_link_footer;

    // company name
    const company_name_footer = websettingsdata && websettingsdata.company_name_footer;

    return (
        <Fragment>
            <div className="footer_wrapper">
                {/* <div className="bottom_circle">
                    <img src={bottomcircle.src} alt="circle" />
                </div> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3  col-12 footer_left">
                            <div className="footer_logo">
                                <Logo image={footer_logo} />
                            </div>
                            <div className="footer_left_text">
                                <p><strong>Quiz Forge</strong> is a vibe coded project for the Outlier Vibe Coding Competition.<br />
                                    <strong>Topic:</strong> EDUCATION - Quiz app with score at end and retry option.<br />
                                    This platform is designed to make learning fun, interactive, and rewarding. Thank you for visiting!</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3  col-12 footer_left_second">
                            <div className="footer_title">
                                <h4 className="footer_heading">Policy</h4>
                            </div>
                            <ul className="footer_policy">
                                <li className="footer_list">
                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                </li>
                                <li className="footer_list">
                                    <Link href="/terms-conditions">Terms and Conditions</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3  col-12 footer_right">
                            <div className="footer_title">
                                <h4 className="footer_heading">Company</h4>
                            </div>
                            <ul className="footer_policy">
                                <li className="footer_list">
                                    <Link href="/about-us">About Us</Link>
                                </li>
                                <li className="footer_list">
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 footer_right">
                            <div className="footer_title">
                                <h4 className="footer_heading">Find Us Here</h4>
                            </div>
                            <ul className="footer_policy">
                                <li className="footer_list_address">Techno Main Salt Lake, Kolkata, India</li>
                                <li className="footer_list_email">
                                    <a href="mailto:ridhibratadas@gmail.com">ridhibratadas@gmail.com</a>
                                </li>
                                <li className="footer_list_number">
                                    <a href="tel:+919733557339">+91 9733557339</a>
                                </li>
                            </ul>
                            <ul className="footer_social">
                                {/* You can add social links here if needed */}
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="footer_copyright text-center">
                        <p>
                            Copyright © {new Date().getFullYear()} | Made by Ridhibrata Das
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withTranslation()(Footer);
