"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertPaciente from "./upsert";
interface ICreateButton {
    text?: string;
}

const CreateButton = ({ text }: ICreateButton) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Button
                className="cursor-pointer font-bold"
                onClick={() => setDialogIsOpen(true)}
            >
                <span className="hidden md:block">{text}</span>
                <PlusIcon />
            </Button>
            <UpsertPaciente
                isOpen={dialogIsOpen}
                setIsOpen={setDialogIsOpen}
            />
        </>
    );
};

export default CreateButton;