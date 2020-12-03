package com.mogen.bundle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A ItemPackageDetails.
 */
@Entity
@Table(name = "item_package_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "itempackagedetails")
public class ItemPackageDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "package_id")
    private Integer packageID;

    @Column(name = "row_id")
    private Integer rowID;

    @Size(max = 20)
    @Column(name = "code", length = 20)
    private String code;

    @Size(max = 140)
    @Column(name = "description", length = 140)
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "pkgDets", allowSetters = true)
    private ItemPackage pkg;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPackageID() {
        return packageID;
    }

    public ItemPackageDetails packageID(Integer packageID) {
        this.packageID = packageID;
        return this;
    }

    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }

    public Integer getRowID() {
        return rowID;
    }

    public ItemPackageDetails rowID(Integer rowID) {
        this.rowID = rowID;
        return this;
    }

    public void setRowID(Integer rowID) {
        this.rowID = rowID;
    }

    public String getCode() {
        return code;
    }

    public ItemPackageDetails code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public ItemPackageDetails description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemPackage getPkg() {
        return pkg;
    }

    public ItemPackageDetails pkg(ItemPackage itemPackage) {
        this.pkg = itemPackage;
        return this;
    }

    public void setPkg(ItemPackage itemPackage) {
        this.pkg = itemPackage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPackageDetails)) {
            return false;
        }
        return id != null && id.equals(((ItemPackageDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemPackageDetails{" +
            "id=" + getId() +
            ", packageID=" + getPackageID() +
            ", rowID=" + getRowID() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
