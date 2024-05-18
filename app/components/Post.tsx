import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

interface PostProps {
    title: string;
    content: string;
}

const Post: React.FC<PostProps> = ({ title, content }) => {
    return (
        <Card borderWidth="1px" borderRadius="md" mb={5} mx={10}>
            <CardHeader>
                <Heading as="h2" size="lg" mb={2}>
                    {title}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>{content}</Text>
            </CardBody>
        </Card>
    );
};

export default Post;