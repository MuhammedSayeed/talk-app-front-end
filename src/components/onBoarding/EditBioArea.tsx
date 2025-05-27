"use client"
import { Textarea } from '../ui/textarea'
import ErrorMessage from '../ui/ErrorMessage'
import Spinner from '../ui/Spinner'
import { Button } from '../ui/button'
import { useUpdateUserBio } from '@/hooks/useUpdateUserBio'

const EditBioArea = () => {
    const {errors , handleSubmit , isBioChanged , isLoading , onSubmit , register} = useUpdateUserBio();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-4">
            <div className='w-full'>
                <Textarea {...register("bio")} placeholder="Type your Bio here." />
                {errors["bio"] && <ErrorMessage message={errors["bio"]?.message as string} />}
            </div>
            <div className="flex justify-end gap-2">
                <Button disabled={isLoading || isBioChanged} size={"sm"} variant={"outline"} type="submit" className='cursor-pointer'>
                    {isLoading ? <Spinner color='white' size={16} /> : "Save"}
                </Button>
            </div>
        </form>
    )
}

export default EditBioArea