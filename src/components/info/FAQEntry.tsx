import { Accordion } from "@/src/components/info/Accordion";
import Questions from "@/src/data/Questions";
import FAQQuestionsCard from "@/src/components/info/FAQCard";

const FAQEntry = () => {
  return (
    <div className="bg-bakery-cream w-full px-4 pt-4 pb-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-bakery-burgundy font-bakery-noto text-2xl font-bold md:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-4"
        >
          {Questions.map((item) => (
            <FAQQuestionsCard key={item.question} item={item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQEntry;
