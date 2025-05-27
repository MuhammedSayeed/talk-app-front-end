"use client"
import { useState } from "react"
import { Accordion } from "../../ui/accordion"
import UpdateName from "../updateName/UpdateName"
import UpdateUsername from "../updateUsername/UpdateUsername"

const AccountAccordionWrapper = () => {
    const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1");

    return (
        <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue} className="max-w-md">
            <UpdateName />
            <UpdateUsername />
        </Accordion>
    )
}

export default AccountAccordionWrapper