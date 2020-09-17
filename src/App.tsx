import { Card, CardMedia, FormTitle, Header, Icon, SearchBar, CardContent, Heading, Paragraph, CardActions } from '@datapunt/asc-ui'
import { PersonalLogin, ChevronRight } from '@datapunt/asc-assets'
import React from 'react'

function App() {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <div className="App">
      <Header tall={false} title="Servicentrum Onderwijs" fullWidth={false} homeLink="/" />
      <section style={{ padding: "1em" }}>
        <FormTitle>Zoeken naar docent of school</FormTitle>
        <SearchBar placeholder="Bijv. KvK, Naam of Schoolnaam" autoFocus onChange={(e) => {
          handleSearchInput(e)
        }} />
        <div>
          <Card maxWidth={450} horizontal>
            <CardMedia maxWidth={100} backgroundColor="level2">
              <Icon size={25}>
                <PersonalLogin />
              </Icon>
            </CardMedia>
            <CardContent>
              <Heading as="h6">Ben Schuurmans</Heading>
              <Paragraph>School: De Achterhoek</Paragraph>
            </CardContent>
            <CardActions>
              <Icon size={15}>
                <ChevronRight />
              </Icon>
            </CardActions>
          </Card>
          <Card maxWidth={450} horizontal>
            <CardMedia maxWidth={100} backgroundColor="level2">
              <Icon size={25}>
                <PersonalLogin />
              </Icon>
            </CardMedia>
            <CardContent>
              <Heading as="h6">Ben Schuurmans</Heading>
              <Paragraph>School: De Achterhoek</Paragraph>
            </CardContent>
            <CardActions>
              <Icon size={15}>
                <ChevronRight />
              </Icon>
            </CardActions>
          </Card>
        </div>
      </section>

    </div>
  )
}

export default App;
