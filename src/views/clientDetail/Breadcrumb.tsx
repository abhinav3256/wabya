
import { Breadcrumbs } from "@mui/material"
import Link from "next/link"
import Typography from "@mui/material/Typography"

const Breadcrumb = () => {
  return (
  <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/"> Home </Link>
  <Link color="inherit" href="/clients" > Clients </Link>
  <Typography color="text.primary">Client Details</Typography>
</Breadcrumbs>


)
}

export default Breadcrumb
