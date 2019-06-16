import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { navigate } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

const Header = styled.div`
  width: 100%;
  height: 90px;
  text-align: center;
`

const HeaderTitle = styled.h1`
  font-family: "Quicksand", sans-serif;
  font-size: 2.4em;
  cursor: pointer;
`

const Footer = styled.footer`
  font-family: "Quicksand", sans-serif;
  margin-top: 12px;
`

const Content = styled.div`
  min-height: calc(60vh - 90px);
`

const Text = styled.p`
  color: black;
`
const Layout: React.FC = ({ children }) => (
  <div>
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = data.site.siteMetadata.description
        const keywords = ["starter"]

        return (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: `description`,
                  content: metaDescription,
                },
                {
                  property: `og:title`,
                  content: data.site.siteMetadata.title,
                },
                {
                  property: `og:description`,
                  content: metaDescription,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
                {
                  name: `twitter:creator`,
                  content: data.site.siteMetadata.author,
                },
                {
                  name: `twitter:title`,
                  content: data.site.siteMetadata.title,
                },
                {
                  name: `twitter:description`,
                  content: metaDescription,
                },
              ].concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )}
            />
            <Header>
              <HeaderTitle onClick={() => navigate("/")}>
                {data.site.siteMetadata.title}
              </HeaderTitle>
            </Header>

            <Content>{children}</Content>
            <Footer>
              <Text>This is footer</Text>
            </Footer>
          </>
        )
      }}
    />
  </div>
)

export default Layout

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
