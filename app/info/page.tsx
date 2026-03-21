import Information from "@/components/info/Information";
import FAQ from "@/components/info/FAQEntry";

import Header from "@/components/Header";
const Info = () => {
  return (
    <>
      <Header>
        Info
        <br />
        店舗情報
      </Header>
      <Information />
      <FAQ />
    </>
  );
};

export default Info;
