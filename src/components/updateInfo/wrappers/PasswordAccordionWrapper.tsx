"use client"
import { useState } from "react";
import { Accordion } from "../../ui/accordion";
import UpdatePassword from "../updatePassword/UpdatePassword";

const PasswordAccordionWrapper = () => {
    const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1");

    return (
        <Accordion type="single" value={accordionValue} onValueChange={setAccordionValue} collapsible className="max-w-md">
            <UpdatePassword />
        </Accordion>
    )
}

export default PasswordAccordionWrapper