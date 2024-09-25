import whyRender from "why-render";

export const why = (Component) => (props) => {
  whyRender(Component.name, props)
  console.log(Component.name);

  return (<Component />)
}

