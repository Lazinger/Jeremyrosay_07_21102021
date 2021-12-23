<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Legal first name*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Legal middle name"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  methods: {
    debug() {
      console.log('Je fonctionne');
      dialog = false;
    },
  },
};
</script>

<style></style>
