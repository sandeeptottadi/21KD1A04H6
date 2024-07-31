import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import Switch from "@mui/material/Switch";

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

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [category, setCategory] = useState("Phone");
  const [company, setCompany] = useState("AMZ");
  const [n, setN] = useState(10);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10000);
  const [availability, setAvailability] = useState("false");
  const [ratingSortOrder, setRatingSortOrder] = useState("ascending");
  const [priceSortOrder, setPriceSortOrder] = useState("ascending");
  // ... existing code ...
  const handleRatingSortOrderChange = (event: SelectChangeEvent) => {
    const newSortOrder = event.target.value as string;
    setPriceSortOrder(newSortOrder);
    updateURL(
      category,
      company,
      n,
      min,
      max,
      availability,
      newSortOrder,
      priceSortOrder
    );
  };

  const handlePriceSortOrderChange = (event: SelectChangeEvent) => {
    const newSortOrder = event.target.value as string;
    setPriceSortOrder(newSortOrder);
    updateURL(
      category,
      company,
      n,
      min,
      max,
      availability,
      ratingSortOrder,
      newSortOrder
    );
  };

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
    updateURL(
      category,
      company,
      n,
      min,
      max,
      availability,
      ratingSortOrder,
      priceSortOrder
    );
  }, []);

  const navigate = useNavigate();

  const updateURL = (
    category: string,
    company: string,
    n: number,
    min: number,
    max: number,
    availability: string,
    ratingSortOrder: string,
    priceSortOrder: string
  ) => {
    const queryParams = new URLSearchParams();
    queryParams.set("category", category);
    queryParams.set("company", company);
    queryParams.set("n", n.toString());
    queryParams.set("min", min.toString());
    queryParams.set("max", max.toString());
    queryParams.set("availability", availability);
    navigate({ search: queryParams.toString() });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value as string;
    setCategory(newCategory);
    updateURL(
      newCategory,
      company,
      n,
      min,
      max,
      availability,
      ratingSortOrder,
      priceSortOrder
    );
  };

  const handleCompanyChange = (event: SelectChangeEvent) => {
    const newCompany = event.target.value as string;
    setCompany(newCompany);
    updateURL(
      category,
      newCompany,
      n,
      min,
      max,
      availability,
      ratingSortOrder,
      priceSortOrder
    );
  };

  return (
    <div className=" w-3/4 flex flex-row justify-center gap-6 flex-wrap">
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
          updateURL(
            category,
            company,
            newN,
            min,
            max,
            availability,
            ratingSortOrder,
            priceSortOrder
          );
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
          updateURL(
            category,
            company,
            n,
            newN,
            max,
            availability,
            ratingSortOrder,
            priceSortOrder
          );
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
          updateURL(
            category,
            company,
            n,
            min,
            newN,
            availability,
            ratingSortOrder,
            priceSortOrder
          );
        }}
      />

      <div>
        <label>Product Availability</label>
        <Switch
          onChange={(val) => {
            setAvailability(val.target.checked ? "true" : "false");
            updateURL(
              category,
              company,
              n,
              min,
              max,
              val.target.checked ? "true" : "false",
              ratingSortOrder,
              priceSortOrder
            );
          }}
          {...label}
        />
      </div>

      <Box sx={{ maxWidth: 120, minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priceSortOrder}
            label="Sort by Price"
            onChange={handlePriceSortOrderChange}
          >
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ maxWidth: 120, minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ratingSortOrder}
            label="Sort by Rating"
            onChange={handleRatingSortOrderChange}
          >
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
