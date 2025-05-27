"use client"
import ErrorMessage from "@/components/ui/ErrorMessage";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserBio } from "@/hooks/useUpdateUserBio";


const UpdateUserBio = () => {
    const {errors , handleSubmit , isBioChanged , isLoading , onSubmit, register} = useUpdateUserBio();


    return (
        <AccordionItem value="item-1">
            <AccordionTrigger className='cursor-pointer'>
                <h2 className='text-lg text-white/80'>Edit Bio</h2>
            </AccordionTrigger>
            <AccordionContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-md flex flex-col gap-3"
                >
                    <div className="flex gap-3 justify-between">
                        <Textarea
                            {...register("bio")}
                            placeholder="Type your Bio here."
                        />
                        {errors["bio"] && <ErrorMessage message={errors["bio"]?.message as string} />}
                    </div>
                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading || isBioChanged}
                            className="min-w-[75.3px] min-h-[32px] cursor-pointer"
                            size={"sm"}
                        >
                            Confirm
                        </Button>
                    </div>
                </form>
            </AccordionContent>
        </AccordionItem>
    )
}

export default UpdateUserBio