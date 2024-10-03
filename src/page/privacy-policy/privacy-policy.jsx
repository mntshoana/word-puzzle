import css from "./privacy-policy.module.css";

const PrivacyPolicy = () => {
  return (
    <main className={css.main}>
      <h1 className={css.h1}>Privacy Policy</h1>
      <h3 className={css.h3}>General</h3>
      <p className={css.p}>
        Generator operates this site and provides an online puzzle service. This
        page serves to inform visitors about our policy with the collection,
        use, and disclosure of personal information.
      </p>
      <p className={css.p}>
        If you choose to use this site, rest assured that we currently do not
        collect any user information. Should this change in future, then this
        page will be updated to reflect this information. Any potential
        information that may be collected in future will be used in providing
        and improving this service.{" "}
        <span className={css.bold}>
          We will not use or share your information with anyone except as
          described in this privacy policy
        </span>
        .
      </p>
      <h3 className={css.h3}>Log Data</h3>
      <p className={css.p}>
        Whenever you visit our Service, there will be log data information that
        your browser sends to us . This Log Data may include information such as
        your computer’s Internet Protocol (“IP”) address, browser version, pages
        of our Service that you visit, the time and date of your visit, the time
        spent on those pages, and other statistics. This information is
        currently not stored/collected.
      </p>
      <h3 className={css.h3}>Cookies</h3>
      <p className={css.p}>
        Cookies are files with small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        website that you visit and are stored on your computer’s hard drive.
      </p>
      <p className={css.p}>
        Our website use does not use these “cookies” to collection information
        nor to improve our Service. You have the option to either accept or
        refuse these cookies, and know when a cookie is being sent to your
        computer. If you choose to refuse our cookies, you will still be able to
        our Service.
      </p>
      <h3 className={css.h3}>Service Providers</h3>
      <p className={css.p}>
        We may employ third-party companies and individuals due to the following
        reasons: To facilitate our Service; To provide the Service on our
        behalf; To perform Service-related services; or To assist us in
        analyzing how our Service is used. We want to inform our Service users
        that these third parties have access to your Personal Information. The
        reason is to perform the tasks assigned to them on our behalf. However,
        they are obligated not to disclose or use the information for any other
        purpose.
      </p>
      <h3 className={css.h3}>Security</h3>
      <p className={css.p}>
        We value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee
        its absolute security.
      </p>
      <h3 className={css.h3}>Links to Other Sites</h3>
      <p className={css.p}>
        Our Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by us. Therefore, we strongly advise you
        to review the Privacy Policy of these websites. We have no control over,
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </p>
      <h3 className={css.h3}>Changes to This Privacy Policy</h3>
      <p className={css.p}>
        We may update our Privacy Policy from time to time. Thus, we advise you
        to review this page periodically for any changes. We will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately, after they are posted on this page.
      </p>
      <h3 className={css.h3}>Contact Us</h3>
      <p className={css.p}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us.
      </p>{" "}
    </main>
  );
};

export default PrivacyPolicy;
