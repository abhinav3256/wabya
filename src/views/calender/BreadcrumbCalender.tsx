
import { Breadcrumbs } from "@mui/material"
import Link from "next/link"
import Typography from "@mui/material/Typography"

const BreadcrumbCalender = () => {
  return (
  <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/dashboard"> Home </Link>
  <Typography color="text.primary">Calender</Typography>
</Breadcrumbs>


)
}

export default BreadcrumbCalender
