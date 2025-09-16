"use client";

import { Paciente } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import UpsertPaciente from "./upsert";

interface EditPacienteButtonProps {
    paciente: Paciente
}

const EditPacienteButton = ({ paciente }: EditPacienteButtonProps) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => setDialogIsOpen(true)}
            >
                <PencilIcon className="text-green-600" />
            </Button>
            <UpsertPaciente
                isOpen={dialogIsOpen}
                setIsOpen={setDialogIsOpen}
                defaultValues={{
                    ...paciente,
                }}
                pacienteId={paciente.id}
            />
        </>
    );
};

export default EditPacienteButton;