import React from 'react'
import { Footer,FooterLink, FooterLinkGroup, FooterTitle,FooterDivider,FooterCopyright,FooterIcon } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import {Link} from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5 '>
                 <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 rounded-lg text-white'>Manvitha's</span>
                        Blog
                      </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.100jsprojects.com" target='_blank ' rel='noopener noreferrer'>100 JS Projects</FooterLink>
                <FooterLink href="/about" target='_blank ' rel='noopener noreferrer'>Manvitha's Blog</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Manvitha's Blog™" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
          </div>
        </div>
            
                    </div>
    </Footer>
  );
}
