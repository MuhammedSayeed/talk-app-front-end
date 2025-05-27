import ErrorMessage from '@/components/ui/ErrorMessage';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UPDATE_NAME_SOCIAL_USERS_INPUTS_FORM } from '@/constants/forms';
import useUpdateNameForSocialUsers from '@/hooks/useUpdateNameForSocialUsers';

const UpdateNameForSocialUsers = () => {
  const { errors, handleSubmit, isLoading, isNameChanged, onSubmit, register } = useUpdateNameForSocialUsers();
  const RENDER_INPUTS = UPDATE_NAME_SOCIAL_USERS_INPUTS_FORM.map((i) => (
    <div key={i.id} >
      <label htmlFor={i.id} className="text-[14px]">{i.label}</label>
      <Input {...register(i.name)} id={i.id} type={i.type} className="px-4 py-4 text-base md:text-lg mt-2" />
      {errors[i.name] && <ErrorMessage size='text-xs' message={errors[i.name]?.message as string} />}
    </div>
  ))


  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className='cursor-pointer'>
        <h2 className='text-lg text-white/80'>Edit Name</h2>
      </AccordionTrigger>
      <AccordionContent>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-3">
          <div className="flex gap-3 justify-between">
            {RENDER_INPUTS}
          </div>
          <div className="w-full flex justify-end">
            <Button disabled={isLoading || !isNameChanged} className="min-w-[75.3px] min-h-[32px] cursor-pointer" size={"sm"}>
              Confirm
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}

export default UpdateNameForSocialUsers