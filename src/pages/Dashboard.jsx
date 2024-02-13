import { useState } from "react";
import { Button } from "@/components/ui/button";
import Faq from "@/components/Faq";

export const Dashboard = () => {
  const [number, setNumber] = useState(0);
  return (
    <section>
      <div
        className="flex justify-center align-middle items-center flex-col gap-2 m-auto"
        style={{ height: "100vh", maxWidth: 600 }}
      >
        <Button onClick={() => setNumber(number + 1)}>Incremental</Button>
        <h2>
          Number: <span>{number}</span>
        </h2>
        <Faq />
      </div>
    </section>
  );
};
