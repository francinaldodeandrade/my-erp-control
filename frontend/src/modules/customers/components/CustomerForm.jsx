import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { customersApi } from "../../../api/customers.api";

export default function CustomerForm({
  initialData = null,
  onSubmit = null,
}) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [code, setCode] = useState(
    initialData?.code || ""
  );

  const [name, setName] = useState(
    initialData?.name || ""
  );

  const [cpfCnpj, setCpfCnpj] =
    useState(
      initialData?.cpfCnpj || ""
    );

  const [phone, setPhone] =
    useState(
      initialData?.phone || ""
    );

  const [mobile, setMobile] =
    useState(
      initialData?.mobile || ""
    );

  const [email, setEmail] =
    useState(
      initialData?.email || ""
    );

  const [city, setCity] =
    useState(
      initialData?.city || ""
    );

  const [state, setState] =
    useState(
      initialData?.state || ""
    );

  const [creditLimit, setCreditLimit] =
    useState(
      initialData?.creditLimit || ""
    );

  const [notes, setNotes] =
    useState(
      initialData?.notes || ""
    );

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      code,
      name,
      cpfCnpj,
      phone,
      mobile,
      email,
      city,
      state,
      creditLimit,
      notes,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await customersApi.create(
          payload
        );

        queryClient.invalidateQueries({
          queryKey: ["customers"],
        });

        alert(
          "Cliente criado com sucesso"
        );

        navigate("/customers");
      }
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Erro ao salvar cliente"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Código</label>

        <input
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
        />
      </div>

      <div>
        <label>Nome</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div>
        <label>CPF/CNPJ</label>

        <input
          value={cpfCnpj}
          onChange={(e) =>
            setCpfCnpj(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Telefone</label>

        <input
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Celular</label>

        <input
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Email</label>

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Cidade</label>

        <input
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Estado</label>

        <input
          value={state}
          onChange={(e) =>
            setState(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Limite Crédito</label>

        <input
          value={creditLimit}
          onChange={(e) =>
            setCreditLimit(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label>Observações</label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
        />
      </div>

      <button type="submit">
        {initialData
          ? "Atualizar"
          : "Salvar"}
      </button>
    </form>
  );
}