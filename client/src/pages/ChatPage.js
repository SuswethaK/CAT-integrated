import { Box, ChakraProvider, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/ChatBox"
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import ChatProvider from "../components/ChatProvider";
import { ChatState } from "../components/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  console.log(ChatState());
  const { user } = ChatState();

  // Determine whether to show MyChats based on screen size
  const showMyChats = useBreakpointValue({ base: false, md: true });

  return (
    <ChakraProvider>
      <BrowserRouter>
        <ChatProvider>
          <Box width="100%">
            {user && <SideDrawer />}
            <Flex justifyContent="space-between" height="91.5vh" padding="10px">
              {/* Only render MyChats if showMyChats is true */}
              {showMyChats && user && <MyChats fetchAgain={fetchAgain} />}
              {user && (
                <Chatbox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </Flex>
          </Box>
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default Chatpage;
