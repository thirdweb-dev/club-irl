import { table } from "@/utils/Airtable";
import { Flex } from "@chakra-ui/react";
import { getUser } from "auth.config";
import type { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { IFormData } from "../../types/IFormData";
import { Form } from "../components/Profile/Form";
import MainLayout from "../Layouts/MainLayout";

const Register = ({ user }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: user,
  });

  return (
    <MainLayout>
      <Flex
        w="full"
        align="center"
        justify="center"
        h={{ base: "auto", md: "100vh" }}
      >
        <Form register={register} handleSubmit={handleSubmit} errors={errors} />
      </Flex>
    </MainLayout>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await getUser(req);

  const record = await table
    .select({
      fields: [
        "address",
        "email",
        "name",
        "company",
        "role",
        "bio",
        "communication",
        "handle",
        "shared_channel",
        "location_city",
      ],
      filterByFormula: `address = '${user?.address}'`,
    })
    .all();

  if (record.length === 0) {
    return {
      props: {
        user: {},
      },
    };
  }

  return {
    props: {
      user: record[0].fields,
    },
  };
};
