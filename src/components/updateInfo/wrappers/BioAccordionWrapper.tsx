"use client"

import { useState } from "react";
import { Accordion } from "../../ui/accordion"
import UpdateUserBio from "../updateBio/UpdateUserBio";


const BioAccordionWrapper = () => {

  const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1");

  return (
    <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue} className="max-w-md">
      <UpdateUserBio />
    </Accordion>
  )
}

export default BioAccordionWrapper