import { Accordion } from "@/components/info/Accordion";
import Questions from "@/data/Questions";
import FAQQuestionsCard from "@/components/info/FAQCard";

const FAQEntry = () => {
  return (
    <div className="bg-bakery-cream w-full px-4 py-12 md:px-8">
      <Accordion
        type="single"
        collapsible
        className="mx-auto flex w-full flex-col gap-4"
      >
        {Questions.map((item) => (
          <FAQQuestionsCard key={item.question} item={item} />
        ))}
      </Accordion>
    </div>
  );
};

export default FAQEntry;
