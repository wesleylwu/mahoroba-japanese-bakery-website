import Information from "@/src/components/info/Information";
import FAQ from "@/src/components/info/FAQEntry";

import Header from "@/src/components/Header";
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
