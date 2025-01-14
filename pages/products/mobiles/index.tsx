import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, IconButton, Input, Show } from "@chakra-ui/react";
import MobileFilter from "@/components/ProductSection/Mobiles/MobileFilter";
import ResponsiveMobileFilter from "@/components/ProductSection/Mobiles/ResponsiveMobileFilter";
import ProductCard from "@/components/ProductSection/ProductCard";
import { BsSearch } from "react-icons/bs";
import { getMobileAPI } from "@/redux/products/products.api";
import RightSidebar from "@/components/RightSidebar";

const Mobiles = ({ mobiles }: any) => {
  const srcIpRef = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState<number>(5);

  // let searchValue = srcIpRef?.current?.value || "";

  // const HandleSearch = () => {
  //   let searchedData = mobiles.filter((el) => {
  //     // return Object.values(el).find((str) => ("" + str).toLowerCase().includes(searchValue.toLowerCase()));
  //     return Object.values(el);
  //   });
  //   setMobileData(searchedData);
  // };

  return (
    <>
      <Flex direction={{ base: "column", sm: "column", md: "row" }} w={"100%"} p={"10"} justifyContent={"center"}>
        <Flex
          flex={1}
          justifyContent={{
            base: "flex-start",
            sm: "flex-start",
            md: "center",
          }}
          alignItems={"flex-start"}
          mx={4}
        >
          <Show above="md">
            <MobileFilter />
          </Show>
          <ResponsiveMobileFilter />
        </Flex>
        <Flex mx={4} flex={2} direction={"column"} alignItems={"center"}>
          {/* Search Functionality */}
          <Flex>
            <Input ref={srcIpRef} w={{ base: "300px", sm: "380px" }} variant="flushed" type={"text"} placeholder={"Search Here"} />
            <IconButton
              aria-label="xyz"
              // onClick={() => HandleSearch()}
              borderRadius={"0px"}
              _hover={{}}
              color={"white"}
              bgColor={"red"}
              icon={<BsSearch />}
            />
          </Flex>
          {/* Search Function End */}
          {mobiles?.map((data: any, id: number) => {
            if (id < loader) {
              return <ProductCard key={data.id} {...data} productLink={"mobiles"} />;
            }
          })}
          <Button onClick={() => setLoader((prev) => prev + 2)} colorScheme={"red"}>
            Load More
          </Button>
        </Flex>
        <Show above="xl">
          <Flex mx={4} flex={2} justifyContent={"center"}>
            <RightSidebar />
          </Flex>
        </Show>
      </Flex>
    </>
  );
};

export default Mobiles;

export const getStaticProps = async () => {
  const mobiles = await getMobileAPI(10);
  return {
    props: {
      mobiles,
    },
  };
};
