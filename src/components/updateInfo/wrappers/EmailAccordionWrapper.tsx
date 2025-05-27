"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import UpdateEmail from "../updateEmail/UpdateEmail";
import VerifyEmail from "../verifyEmail/VerifyEmail";
const EmailAccordionWrapper = () => {

    const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1");

    return (
        <Accordion type="single"  value={accordionValue} onValueChange={setAccordionValue} className="max-w-md">
            <UpdateEmail onSuccess={() => setAccordionValue("item-2")} />
            <VerifyEmail onSuccess={() => setAccordionValue(undefined)} />
        </Accordion>
    )
}

export default EmailAccordionWrapper