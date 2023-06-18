import { Card, Image, Text, Group } from '@mantine/core';
 

export default function HowOrganicCard({data}) {
 
  return (
    <Card withBorder radius="md" p="md" style={{backgroundColor: "white" , maxWidth:"25rem" , margin:'1rem'}}>
      <Card.Section>
        <Image src={data.image} alt={data.title} height={180} />
      </Card.Section>

      <Card.Section  className='how-organic-card-section' mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {data.title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {data.description}
        </Text>
      </Card.Section>

      <style>
        {`
        .how-organic-card-section {
            border-bottom: 1px solid grey;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: 1rem;
        }
        `}
      </style>
    </Card>
  );
}