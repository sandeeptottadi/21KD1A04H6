import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";

export default function Filters() {
  interface Options {
    value: string;
    label: string;
  }
  const options: Options[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [category, setCategory] = useState("Phone");
  const [company, setCompany] = useState("AMZ");
  const [n, setN] = useState(10);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10000);

  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

  const categories = [
    "Phone",
    "Computer",
    "TV",
    "Earphone",
    "Tablet",
    "Charger",
    "Mouse",
    "Keypad",
    "Bluetooth",
    "Pendrive",
    "Remote",
    "Speaker",
    "Headset",
    "Laptop",
    "PC",
  ];

  useEffect(() => {
    updateURL(category, company, n, min, max);
  }, []);

  const navigate = useNavigate();

  const updateURL = (
    category: string,
    company: string,
    n: number,
    min: number,
    max: number
  ) => {
    const queryParams = new URLSearchParams();
    queryParams.set("category", category);
    queryParams.set("company", company);
    queryParams.set("n", n.toString());
    queryParams.set("min", min.toString());
    queryParams.set("max", max.toString());
    navigate({ search: queryParams.toString() });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value as string;
    setCategory(newCategory);
    updateURL(newCategory, company, n, min, max);
  };

  const handleCompanyChange = (event: SelectChangeEvent) => {
    const newCompany = event.target.value as string;
    setCompany(newCompany);
    updateURL(category, newCompany, n, min, max);
  };

  return (
    <div className=" w-3/4 flex flex-row justify-center gap-6">
      <Box sx={{ maxWidth: 240, minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Company</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={company}
            label="Company"
            onChange={handleCompanyChange}
          >
            {companies.map((c) => {
              return (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((c) => {
              return (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="No of Jobs per page"
        variant="outlined"
        value={n}
        onChange={(event) => {
          const newN = parseInt(event.target.value, 10);
          setN(newN);
          updateURL(category, company, newN, min, max);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Min Price"
        variant="outlined"
        value={min}
        onChange={(event) => {
          const newN = parseInt(event.target.value, 10);
          setMin(newN);
          updateURL(category, company, n, newN, max);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Max Price"
        variant="outlined"
        value={max}
        onChange={(event) => {
          const newN = parseInt(event.target.value, 10);
          setMax(newN);
          updateURL(category, company, n, min, newN);
        }}
      />
    </div>
  );
}
